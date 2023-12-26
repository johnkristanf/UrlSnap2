

export const downloadAudio = async (mp3Title:string, convertedAudioBuffer: any) => {
  
  const blob = new Blob([convertedAudioBuffer], { type: 'audio/mpeg' });

  const a = document.createElement('a');

  a.href = URL.createObjectURL(blob);

  a.download = `${mp3Title}.mp3`;

  a.click();

  URL.revokeObjectURL(a.href);
  
};
