export function generateSlug(text: string): string {
    return text
        .normalize("NFD") // Remove acentos
        .replace(/[\u0300-\u036f]/g, "") // Remove caracteres diacríticos
        .toLowerCase() // Converte para minúsculas
        .replace(/[^\w\s]/g, "") // Remove símbolos
        .trim() // Remove espaços em branco no início e no fim
        .replace(/\s+/g, "-"); // Substitui espaços por hífens
}


