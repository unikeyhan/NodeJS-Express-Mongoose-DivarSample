const { Schema, Types, model } = require('mongoose');

const CategorySchmea = new Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, index: true },
        icon: { type: String, required: true },
        parent: { type: Types.ObjectId, ref: 'Category', required: false },
        parents: { type: [Types.ObjectId], ref: 'Category', required: false, default: [] },
    },
    { versionKey: false, id: false, toJSON: { virtuals: true } }
);

CategorySchmea.virtual('children', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'parent',
});

function autoPopulate(next) {
    this.populate([{ path: 'children' }]);
    next();
}
CategorySchmea.pre('find', autoPopulate).pre('findOne', autoPopulate);

const CategoryModel = model('Category', CategorySchmea);

module.exports = CategoryModel;
