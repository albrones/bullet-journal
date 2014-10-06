var Joi = require('joi');
Joi.objectId = require('joi-objectid');
var Boom = require('boom');
var Post = require('./models/post');


exports.index = {
    handler: function (request, reply) {
        Post.find(request.query, function (err, posts) {
            if(err) {
                console.log(err);
            }

            reply(posts);
        });
    },
    validate: {
        query: {
            type: Joi.string().optional(),
            tags: Joi.string().optional()
        }
    }
};

exports.create = {
    handler: function (request, reply) {
        Post.create(request.payload, function (err, post) {
            if(err) {
                reply(Boom.badData());
            }

            reply(post);
        });
    },

    validate: {
        payload: {
            title: Joi.string(),
            content: Joi.string(),
            tags: Joi.array().optional(),
            type: Joi.string().allow('regular', 'daily').default('regular')
        }
    }
};

exports.show = {
    handler: function (request, reply) {
        var safeId = encodeURIComponent(request.params.post_id);

        Post.findById(safeId, function (err, post) {
            if(err) {
                return reply(Boom.badImplementation());
            }

            reply(post);
        });
    },
    validate: {
        params: {
            post_id: Joi.objectId()
        }
    }
};

exports.update = {
    handler: function (request, reply) {
        var safeId = encodeURIComponent(request.params.post_id);

        Post.findByIdAndUpdate(safeId, {
            $set: request.payload
        }, function (err, post) {
            if(err) {
                return reply(Boom.badImplementation());
            }

            if(!post) {
                return reply(Boom.notFound());
            }

            reply(post);
        });
    },
    validate: {
        params: {
            post_id: Joi.objectId()
        }
    }
};

exports.delete = {
    handler: function (request, reply) {
        var safeId = encodeURIComponent(request.params.post_id);
        Post.findByIdAndRemove(safeId, function (err, model) {
            if(err) {
               return reply(Boom.badImplementation());
            }

            if(!model) {
                return reply(Boom.notFound());
            }

            reply().hold().code(204).send();

        });
    },
    validate: {
        params: {
            post_id: Joi.objectId()
        }
    }
};