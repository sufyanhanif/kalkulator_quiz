import { useState } from 'react';

export default function Calculator() {
  const [input, setInput] = useState('');
  const [quiz, setQuiz] = useState(null); // Menyimpan soal { question, answer }
  const [showQuiz, setShowQuiz] = useState(false);

  const handleButtonClick = (value) => setInput(input + value);
  const clear = () => setInput('');
  const deleteLast = () => setInput(input.slice(0, -1));

  const calculate = () => {
    try {
      setInput(String(eval(input)));
    } catch {
      setInput('Error');
    }
  };

  // Fungsi untuk membuat soal random
  const generateQuiz = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    
    const question = `${num1} ${op} ${num2}`;
    const answer = eval(question);
    
    setQuiz({ question, answer });
    setShowQuiz(true);
    setInput(''); // Kosongkan input untuk menjawab
  };

  const checkAnswer = () => {
    if (parseInt(input) === quiz.answer) {
      alert("Hebat! Jawaban Benar 🎉");
      setShowQuiz(false);
      setInput(String(quiz.answer));
    } else {
      alert("Ups! Coba hitung lagi ya ❌");
    }
  };

  return (
    <div className="bg-[#1E1E1E] w-full h-screen flex flex-col items-center justify-center p-4">
      
      {/* Tampilan Quiz (Hanya muncul jika showQuiz true) */}
      {showQuiz && (
        <div className="mb-4 p-4 bg-yellow-100 border-2 border-yellow-400 rounded-lg text-center animate-bounce">
          <p className="text-lg font-bold text-yellow-700">Berapa hasil dari: {quiz.question}?</p>
          <p className="text-xs text-yellow-600">Ketik jawaban di kalkulator lalu tekan "="</p>
        </div>
      )}

      <div className="bg-[#A6C09A] p-4 rounded-lg shadow-md w-full max-w-xs">
        <input 
          type="text" 
          value={input} 
          readOnly 
          className="w-full mb-4 p-2 border rounded bg-white text-right text-2xl border-[#D9808A] focus:outline-none"
        />

        <div className="grid grid-cols-4 gap-2">
          {/* Baris Baru: Tombol Quiz (?) */}
          <button onClick={clear} className='bg-[#578841] text-white p-2 rounded'>C</button>
          <button onClick={deleteLast} className='bg-[#578841] text-white p-2 rounded'>DEL</button>
          {/* Tombol Tanda Tanya untuk Quiz */}
          <button onClick={generateQuiz} className='bg-blue-500 text-white p-2 rounded font-bold shadow-lg'>?</button>
          <button onClick={() => handleButtonClick('/')} className='bg-[#578841] text-white p-2 rounded'>/</button>

          {/* Tombol Angka & Operator Lainnya */}
          <button onClick={() => handleButtonClick('7')} className='bg-[#D6FFC4] p-2 rounded'>7</button>
          <button onClick={() => handleButtonClick('8')} className='bg-[#D6FFC4] p-2 rounded'>8</button>
          <button onClick={() => handleButtonClick('9')} className='bg-[#D6FFC4] p-2 rounded'>9</button>
          <button onClick={() => handleButtonClick('*')} className='bg-[#578841] text-white p-2 rounded'>*</button>

          <button onClick={() => handleButtonClick('4')} className='bg-[#D6FFC4] p-2 rounded'>4</button>
          <button onClick={() => handleButtonClick('5')} className='bg-[#D6FFC4] p-2 rounded'>5</button>
          <button onClick={() => handleButtonClick('6')} className='bg-[#D6FFC4] p-2 rounded'>6</button>
          <button onClick={() => handleButtonClick('-')} className='bg-[#578841] text-white p-2 rounded'>-</button>

          <button onClick={() => handleButtonClick('1')} className='bg-[#D6FFC4] p-2 rounded'>1</button>
          <button onClick={() => handleButtonClick('2')} className='bg-[#D6FFC4] p-2 rounded'>2</button>
          <button onClick={() => handleButtonClick('3')} className='bg-[#D6FFC4] p-2 rounded'>3</button>
          <button onClick={() => handleButtonClick('+')} className='bg-[#578841] text-white p-2 rounded'>+</button>

          <button onClick={() => handleButtonClick('0')} className='bg-[#D6FFC4] p-2 rounded col-span-2'>0</button>
          <button onClick={() => handleButtonClick('.')} className='bg-[#D6FFC4] p-2 rounded'>.</button>
          
          {/* Tombol Sama Dengan berfungsi sebagai pengecek jika sedang mode Quiz */}
          <button 
            onClick={showQuiz ? checkAnswer : calculate} 
            className='bg-[#D9808A] text-white p-2 rounded font-bold hover:bg-[#c46d77]'
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}