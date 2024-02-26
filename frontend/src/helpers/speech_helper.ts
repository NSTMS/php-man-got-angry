export const play_sound = (text: string) =>{
    const lang = localStorage.getItem('lang') ;
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
	console.log(voices);
    const utterThis = new SpeechSynthesisUtterance(text);
    // lang jest nullem dlatego gada po polsku
    utterThis.lang = lang!;

    synth.speak(utterThis);
}
