export const validateDesc = (description) => {
    if (!description || typeof description !== "string") {
        return "Description is required";
    }

    const trimmed = description.trim();

    if (trimmed.length < 10) {
        return "Description is too short";
    }

    if (!/[a-zA-Z]/.test(trimmed)) {
        return "Description must contain letters";
    }

    if (trimmed.length > 1000) {
        return "Description is too long";
    }

    return null; // valid
};