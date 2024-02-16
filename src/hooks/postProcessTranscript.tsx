const postProcessTranscript = (transcript: string) => {
    const alphabetMap = {
        'a': ['a', 'eh', 'hey', 'ay'],
        'b': ['b', 'bee', 'be'],
        'c': ['c', 'see', 'sea'],
        'd': ['d', 'dee'],
        'e': ['e', 'ee', 'ea'],
        'f': ['f', 'ef'],
        'g': ['g', 'gee', 'ji'],
        'h': ['h', 'aitch', 'hache'],
        'i': ['i', 'eye', 'ai'],
        'j': ['j', 'jay', 'jai'],
        'k': ['k', 'kay', 'ka'],
        'l': ['l', 'el'],
        'm': ['m', 'em'],
        'n': ['n', 'en'],
        'o': ['o', 'oh'],
        'p': ['p', 'pee'],
        'q': ['q', 'cue', 'queue'],
        'r': ['r', 'ar'],
        's': ['s', 'ess'],
        't': ['t', 'tee'],
        'u': ['u', 'you', 'yu'],
        'v': ['v', 'vee'],
        'w': ['w', 'double u', 'doubleu'],
        'x': ['x', 'ex'],
        'y': ['y', 'why', 'wye'],
        'z': ['z', 'zee', 'zed', 'zeta']
    };

    // Remove a frase "letter" do transcript, ignorando a capitalização
    const cleanedTranscript = transcript.replace(/letter\s+/gi, "").toLowerCase();

    // Dividir o transcript limpo em palavras
    const words = cleanedTranscript.split(/\s+/);

    for (const word of words) {
        for (const [letter, variations] of Object.entries(alphabetMap)) {
            if (variations.includes(word)) {
                return letter.toUpperCase();
            }
        }
    }

    return '';
};

export default postProcessTranscript;