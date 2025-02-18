import Flashcard from "../model/flashcard.model.js"

const getAllFlashcards = async (req, res) => {
    try {
        const flashcards = await Flashcard.find();
        return res
        .status(200)
        .json(
            flashcards
        );
    } catch (err) {
        return res
        .status(500)
        .json(
            { 
                message: "Error while getting all flashcards"
            }
        );
    }
}

const addNewFlashCard = async (req, res) => {
    const {question, answer} = req.body;
    try {
        const newFlashcard = await Flashcard.create(
            {
                question: question,
                answer: answer
            }  
        );

        return res
        .status(200)
        .json(newFlashcard);
    } catch (err) {
        return res
        .status(500)
        .json(
            { 
                message: err.message
            }
        );
    }
}

const updateFlashCard = async (req, res) => {
    const {id} = req.params;
    try {
        const flashcard = await Flashcard.findById(id);
        if (!flashcard) {
            return res
            .status(404)
            .json(
                { message: 'Flashcard not found' }
            );
        }
        
        const { isCorrect } = req.body;
        
        if (isCorrect) {
            flashcard.moveToNextBox();
        } else {
            flashcard.moveToFirstBox();
        }
        // const updatedFlashcard = await Flashcard.save();
        
        return res
        .status(200)
        .json(
            {
                message: "Updated correctly !"
            }
        );

    } catch (err) {
        return res
        .status(500)
        .json(
            { message: "Error while Updating Flash card data" }
        );
    }
}

const deleteFlashCard = async (req, res) => {
    const {id} = req.params;
    try {
        const flashcard = await Flashcard.findByIdAndDelete(id);
        if (!flashcard) {
            return res
            .status(404)
            .json(
                { message: 'Flashcard not found' }
            );
        }
        return res
        .status(200)
        .json(
            { message: 'Flashcard deleted' }
        );
    } catch (err) {
        return res
        .status(500)
        .json({ message: "Error while deleting Flashcard" });
    }
}

const flashCardDue = async (req, res) => {
    try {
        const dueFlashcards = await Flashcard.find({
            nextReviewDate: { $lte: new Date() }
        });
        return res
        .status(200)
        .json(dueFlashcards);
    } catch (err) {
        return res
        .status(500)
        .json({ message: "Error getting FlashCard due." });
    }
}

export {
    getAllFlashcards,
    addNewFlashCard,
    updateFlashCard,
    deleteFlashCard,
    flashCardDue
}

