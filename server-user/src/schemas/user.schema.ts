import { Schema, model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { isEmail } from 'validator';
import { join } from 'path';
import { BROKER_GENERAL_TYPE_OANDA, USER_GENDER_UNKNOWN, USER_GENDER_MALE, USER_GENDER_FEMALE, USER_GENDER_OTHER } from 'coinpush/constant';
import { IUser } from "coinpush/interface/IUser.interface";
import { countries } from "coinpush/util/countries";
import * as beautifyUnique from 'mongoose-beautiful-unique-validation';

const config = require('../../../tradejs.config');

export const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		email: {
			type: String,
			unique: true,
			required: true,
			validate: [isEmail, 'invalid email'],
			lowercase: true,
			trim: true,
			select: false
		},
		img: {
			type: String,
			trim: true
		},
		gender: {
			type: Number,
			default: USER_GENDER_UNKNOWN,
			enum: [USER_GENDER_UNKNOWN, USER_GENDER_MALE, USER_GENDER_FEMALE, USER_GENDER_OTHER]
		},
		description: {
			type: String,
			default: ''
		},
		password: {
			type: String,
			minlength: 4,
			select: false
		},
		country: {
			type: String,
			required: true,
			trim: true,
			enum: countries.map(country => country.code)
		},
		jobTitle: {
			type: String,
			required: false,
			trim: true,
		},
		favorites: {
			type: [String],
			required: false,
			default: []
		},
		followers: [{
			type: Schema.Types.ObjectId,
			default: [],
			ref: 'User'
		}],
		followersCount: {
			type: Number,
			default: 0
		},
		visitors: [{
			type: Schema.Types.ObjectId,
			default: [],
			ref: 'User'
		}],
		transactions: {
			type: Number,
			required: false,
			default: 0,
			select: false
		},
		lastOnline: {
			type: Date,
			required: false,
			default: Date.now
		},
		membershipStartDate: {
			type: Date,
			required: false,
			default: Date.now,
			select: false
		},
		membershipEndDate: {
			type: Date,
			required: false,
			select: false
		},
		membershipType: {
			type: String,
			required: false,
			default: 'free'
		},
		confirmed: {
			type: Boolean,
			default: false,
			select: false
		},
		resetPasswordToken: {
			type: String,
			select: false
		},
		resetPasswordExpires: {
			type: Date,
			select: false
		},
		emailConfirmed: {
			type: Boolean,
			default: false,
			select: false
		},
		oauthFacebook: {
			type: {
				id: String,
				token: String
			},
			select: false
		}
	},
	{
		timestamps: true
	}
);

UserSchema.pre('validate', function(next) {
    if (!this.password && (!this.oauthFacebook || !this.oauthFacebook.id)) {
        next(new Error('Password must be given'));
    } else {
        next();
    }
});

UserSchema.plugin(beautifyUnique);

// authenticate input against database
UserSchema.statics.authenticate = async (params: IUser, fields = []) => {

	let fieldsObj = { password: 1 };
	fields.forEach(field => fieldsObj[field] = 1);

	const user = <IUser>(await User.findOne({ email: params.email }, { password: 1, ...fieldsObj || {} }).lean());

	if (!user)
		return null;

	return new Promise((resolve, reject) => {
		bcrypt.compare(params.password, user.password, (err, result) => {
			if (err)
				return reject(err);

			if (result !== true)
				return resolve(null);

			delete user.password;
			resolve(user);
		});
	});
};

UserSchema.statics.normalize = function (user, doc) {
	if (!doc)
		throw new Error('UserSchema cannot normalize, doc missing');

	UserSchema.statics.normalizeProfileImg(doc);
	UserSchema.statics.setIFollow(user, doc);
	return doc
};

UserSchema.statics.setIFollow = function (user, doc) {
	if (!doc)
		return;

	if (doc.followers)
		doc.iFollow = doc.followers.map(c => c.toString()).indexOf(user.id) > -1;

	return this;
};

/**
 * Transform image filename to full url
 * @param filename
 * @returns {any}
 */
UserSchema.statics.normalizeProfileImg = function (doc) {
	if (!doc)
		return;

	// const domainPrefix = config.server.gateway.protocol + '://' + (process.env.NODE_ENV === 'production' ? config.ip.prod : config.ip.local + ':' + config.port);

	// followers
	if (doc.followers && doc.followers.length)
		doc.followers.forEach(follower => UserSchema.statics.normalizeProfileImg(follower));

	// default img
	if (!doc.img) {
		// doc.img = domainPrefix + config.image.profileDefaultUrl;
		doc.img = config.image.profileDefaultUrl;
		return;
	}

	// external image
	if (doc.img.startsWith('/') || doc.img.startsWith('http://') || doc.img.startsWith('https://'))
		return;

	// user image
	doc.img = join(config.image.profileBaseUrl, doc.img);
	// doc.img = domainPrefix + join(config.image.profileBaseUrl, doc.img);
};

UserSchema.statics.setFavorite = async function (userId: string, symbol: string): Promise<void> {
	console.log(userId, symbol);
	await (<any>User).updateOne({ _id: userId }, { $addToSet: { favorites: symbol } });
};

UserSchema.statics.unsetFavorite = async function (userId: string, symbol: string): Promise<void> {
	await (<any>User).updateOne({ _id: userId }, { $pull: { favorites: symbol } });
};

export const User = model('User', UserSchema);