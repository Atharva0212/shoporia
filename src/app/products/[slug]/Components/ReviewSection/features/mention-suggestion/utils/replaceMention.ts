  export function updateMentionAtCursor(
    text: string,
    cursorPosition: number,
    replacement: string
  ) {
    const mentionStart = text.lastIndexOf("@", cursorPosition);

    let mentionEnd = text.indexOf(" ", mentionStart);
    if (mentionEnd === -1) mentionEnd = text.length;

    return text.slice(0, mentionStart) + replacement + text.slice(mentionEnd);
  }