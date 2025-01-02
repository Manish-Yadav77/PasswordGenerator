import { useState, useEffect, useCallback, useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [numbers, setNumbers] = useState(false);
  const [character, setCharacter] = useState(false);
  const [leangth, setLeangth] = useState(8);
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbers) str += "0123456789";
    if (character) str += "!@#$%^&*~";

    for (let i = 1; i < leangth; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [leangth, numbers, character, setPassword]);

  useEffect(()=>{
    passwordGenerator();
  },[length, numbers, character, passwordGenerator])

  const copyPassword= useCallback(()=>{
    window.navigator.clipboard.writeText(password);
    // alert("copied to clipboard")
  },[password])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
      <h1 className="text-white text-center my-3">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="password"
          readOnly
          ref={passwordRef}
        />
        <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        onClick={copyPassword}>
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
      <div className="flex items-center gap-x-1">
        <input 
        type="range" 
        min={8}
        max={20}
        onChange={(e)=> {setLeangth(e.target.value)}}
        />
        <label htmlFor="">length: {leangth}</label>
      </div>

      <div className="flex items-center gap-x-1">
        <input 
        type="checkbox" 
        defaultChecked={numbers}
        id="numberInput"
        onChange={()=> {
          setNumbers((prev)=>!prev);
        }}
        />
        <label htmlFor="numberInput">Numbers</label>
      </div>

      <div className="flex items-center gap-x-1">
        <input 
        type="checkbox" 
        defaultChecked={character}
        id="characterInput"
        onChange={()=> {
          setCharacter((prev)=>!prev);
        }}
        />
        <label htmlFor="characterInput">Character {character}</label>
        </div>
      </div>
    </div>
  );
}

export default App;
