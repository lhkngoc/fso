import { connect } from "react-redux"
import { filterArr } from "../reducers/filterReducer"

const Filter = (props) => {

    const handleChange = (event) => {
        event.preventDefault()
        props.filterArr(event.target.value)
    }
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }

const mapDispatchToProps = {
  filterArr,
}


  export default connect(null,mapDispatchToProps)(Filter)