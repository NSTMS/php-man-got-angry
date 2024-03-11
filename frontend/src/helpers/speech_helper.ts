export const play_sound = (text: string) =>{
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const utterThis = new SpeechSynthesisUtterance(text);

    const lang = localStorage.getItem('lang');
    utterThis.voice = voices.find(voice => voice.name === lang)!;
    
    // lang jest nullem dlatego gada po polsku
    synth.speak(utterThis);
}
