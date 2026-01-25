export function isMentionStart(text:string, cursorPosition:number) {
  const beforeCursor = text.slice(0, cursorPosition);
  const match = beforeCursor.match(/(?:^|\s)@[\w.-]*$/);
  return !!match;
}
