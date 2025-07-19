
export function formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN');
}

export function greet(name) {
    return `Hello, ${name}! Welcome to NPM.`;
}
