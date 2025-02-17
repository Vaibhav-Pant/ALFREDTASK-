import mongoose, { Schema } from "mongoose";

const flashcardSchema = new Schema(
    {
        question: {
            type: String,
            required: true,
            trim: true
        },
        answer: {
            type: String,
            required: true,
            trim: true
        },
        box: {
            type: Number,
            default: 1,
            min: 1,
            max: 7  // Assuming 7 boxes in our Leitner system
        },
        nextReviewDate: {
            type: Date,
            default: Date.now
        },
    },
    {
        timestamps: true
    }
);

// Update the 'updatedAt' field on save
flashcardSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Updated moveToNextBox() to save changes
flashcardSchema.methods.moveToNextBox = async function () {
    if (this.box < 7) {
        this.box += 1;
    } 
    this.updateNextReviewDate();
    await this.save(); // Ensure changes are saved in the database
};

// Updated moveToFirstBox() to save changes
flashcardSchema.methods.moveToFirstBox = async function () {
    this.box = 1;
    this.updateNextReviewDate();
    await this.save(); // Ensure changes are saved in the database
};

// Fix: Ensure nextReviewDate updates properly
flashcardSchema.methods.updateNextReviewDate = function () {
    const now = new Date();
    switch (this.box) {
        case 1:
            now.setDate(now.getDate() + 1);
            break;
        case 2:
            now.setDate(now.getDate() + 3);
            break;
        case 3:
            now.setDate(now.getDate() + 7);
            break;
        case 4:
            now.setDate(now.getDate() + 14);
            break;
        case 5:
            now.setDate(now.getDate() + 30);
            break;
        default:
            now.setDate(now.getDate() + 1);
    }
    this.nextReviewDate = now;
};

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

export default Flashcard;
