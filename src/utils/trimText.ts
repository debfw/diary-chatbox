export const trimText = (text: string) => {
    if (text.length > 20) {
      let displayText = text.slice(0, 55) + "...";
      return displayText;
    }
    return text;
  };