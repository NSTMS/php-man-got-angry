export const play_sound = (text: string) =>{
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const utterThis = new SpeechSynthesisUtterance(text);

    const lang = localStorage.getItem('lang') ;
    if(!lang) localStorage.setItem('lang', 'pl-PL');

    utterThis.lang = lang!;
    
    // lang jest nullem dlatego gada po polsku
    synth.speak(utterThis);
}
