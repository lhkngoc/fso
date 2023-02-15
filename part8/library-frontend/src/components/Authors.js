import { ALL_AUTHORS, UPDATE_BORN } from '../queries'
import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { useMutation } from '@apollo/client';
import Select from 'react-select';


const Authors = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [year, setYear] = useState("")

  console.log(selectedOption)

const options = [
  { value: 'Robert Martin', label: 'Robert Martin' },
  { value: 'Martin Fowler', label: 'Martin Fowler' },
  { value: 'Fyodor Dostoevsky', label: 'Fyodor Dostoevsky' },
  { value: 'Joshua Kerievsky', label: 'Joshua Kerievsky' },
  { value: 'Sandi Metz', label:'Sandi Metz'}
  ]

  const [updateAuthor] = useMutation(UPDATE_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error)
    }
  })


  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const upDate = (event) => {
    event.preventDefault();
    updateAuthor({ variables: { name: selectedOption.value, born: parseInt(year) } })
    console.log("update...")
    setYear("")
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birthyear </h3>

      <form onSubmit={upDate}>
      <div>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
      </div>
      <div>
        <label>born:</label>
        <input
          value={year}
          onChange={({ target }) => setYear(target.value)}
        />
        </div>
        <button type="submit">update author</button>
        </form>
    </div>
  )
}

export default Authors
