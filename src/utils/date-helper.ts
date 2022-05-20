export function formatDate(unixDate: number): string {
    return new Date(unixDate).toLocaleDateString();
}