import React from 'react';
import CRUDTable,
{
  Fields,
  Field,
  UpdateForm,
  DeleteForm,
} from 'react-crud-table';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteFood } from '../../../redux/Actions/actions';
// Component's Base CSS
import './Food.css';

const BoardFoods = () => {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const dishes = useSelector(state => state.filterDishes)
const DescriptionRenderer = ({ field }) => <textarea {...field} />;
console.log('dishes', dishes);

// const mapeo =   dishes.map(d=>({id: d._id,title:d.lenguage.en.name, description:d.lenguage.en.descripcion})) 
// console.log('mapeo',mapeo);

let tasks = [
  
  // aca deberian ir todos los platos mapeados, traerlos con la action
  // {
    //   id: 1,
    //   title: 'Create an example',
    //   description: 'Create an example of how to use the component',
    // },
  // {
    //   id: 2,
  //   title: 'Improve',
  //   description: 'Improve the component!',
  // },
  dishes.map(d=>({id: d._id,title:d.lenguage.en.name, description:d.lenguage.en.descripcion, visible:d.state.toString()})) 
  // mapeo
];
// console.log('tasks', tasks[0]);


const SORTERS = {
  NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a)),
};

const getSorter = (data) => {
  const mapper = x => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);

  if (data.field === 'id') {
    sorter = data.direction === 'ascending' ?
      SORTERS.NUMBER_ASCENDING(mapper) : SORTERS.NUMBER_DESCENDING(mapper);
  } else {
    sorter = data.direction === 'ascending' ?
      SORTERS.STRING_ASCENDING(mapper) : SORTERS.STRING_DESCENDING(mapper);
  }

  return sorter;
};


// let count = tasks.length;
// fetchItems()
const service = {
  fetchItems: (payload) => {
    // console.log("PAYLOAD", payload)
    let result = Array.from(tasks[0]);
    // console.log('RESULT', result);
    
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result);
  },
};

const styles = {
  container: { margin: 'auto', width: 'fit-content' },
};

const handleSubmit = (e) =>{
  console.log('EEEE', e.id);
  // e.preventDefault()
  dispatch(deleteFood(e.id))
  window.location.reload()
  // alert("funciona esta porqueria")
}
const handleClickCreate = (e) => {
  e.preventDefault()
  navigate('/createFood')
}

return(
  <>
  <button onClick={handleClickCreate}>create new food</button>
<div style={styles.container}>
    <CRUDTable
      caption="History"
      fetchItems={payload => service.fetchItems(payload)}
      items={tasks[0]}
      // items={result}
    >
      <Fields>
        <Field
          name="id"
          label="Id"
          hideInCreateForm
          readOnly
        />
        <Field
          name="title"
          label="Title"
          placeholder="Title"
        />
        <Field
          name="visible"
          label="Visible"
          placeholder="Visible"
        />
        <Field
          name="description"
          label="Description"
          render={DescriptionRenderer}
        />
      </Fields>
      <UpdateForm
        title="Task Update Process"
        message="Update task"
        trigger="Update"
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={(values) => {
          const errors = {};

          if (!values.id) {
            errors.id = 'Please, provide id';
          }

          if (!values.title) {
            errors.title = 'Please, provide task\'s title';
          }

          if (!values.description) {
            errors.description = 'Please, provide task\'s description';
          }

          return errors;
        }}
      />
      <DeleteForm
        title="Task Delete Process"
        message="Are you sure you want to delete the task?"
        trigger="Delete"
        onSubmit={(e) => handleSubmit(e)}
        submitText="Delete"
        validate={(values) => {
          const errors = {};
          if (!values.id) {
            errors.id = 'Please, provide id';
          }
          return errors;
        }}
      />
    </CRUDTable>
  </div>
  </>
);
      }

// BoardFoods.propTypes = {};
export default BoardFoods
