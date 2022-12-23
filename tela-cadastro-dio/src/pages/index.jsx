import { useState, useCallback, useMemo } from "react";

const Teste = () => {
  
  
  const [name, setName] = useState('Eduardo');
  const [age, setAge] = useState(19);

  // useMemo = referencia em variaveis (const, var, let)
  // useCallback = referencia de funcao.

  const handleChangeName = useCallback(() => {
    console.log('alterou nome')
    setName(prev => prev === 'Eduardo' ? 'Pablo' : 'Eduardo')
  }, [])

  const handleChangeAge = useCallback(() => {
    const newAge = 10 * age;
    console.log('age atual', age, newAge)
    setAge(prev => prev === 19 ? 26 : 19)
  }, [age])


  return (
    <div>
        <p>
            Idade: {age}   
        </p>
        <br />
        <p>
            Nome: {name}   
        </p><br />
        <button onClick={handleChangeName}>Alterar nome</button>
        <br />
        <button onClick={handleChangeAge}>Alterar idade</button>
    </div>
  )
}

export { Teste };
