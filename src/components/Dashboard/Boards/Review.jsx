import React from 'react';
import CRUDTable,
{
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from 'react-crud-table';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteFood } from '../../../redux/Actions/actions';
// Component's Base CSS
import './Review.css';



const BoardReview = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const reviews = useSelector(state => state.reviewsDishes)
  const DescriptionRenderer = ({ field }) => <textarea {...field} />;
  // console.log('dishes', reviews);


  let tasks = [
    reviews.map(d => ({
      id: d._id,
      title: d.title,
      description: d.descriptions,
      score: d.score
    }))

  ];



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

  const service = {
    fetchItems: (payload) => {
      let result = Array.from(tasks[0]);
      result = result.sort(getSorter(payload.sort));
      return Promise.resolve(result);
    },
  };

  const styles = {
    container: { margin: 'auto', width: 'fit-content' },
  };

  const handleSubmit = (e) => {
    dispatch(deleteFood(e.id))
    window.location.reload()
  }

  const handleClickCreate = (e) => {
    e.preventDefault()
    navigate('/createFood')
    window.location.reload()
  }

  return (
    <>
      <div style={styles.container}>
        {/* <div>
          <button onClick={handleClickCreate} margin="30px">create new food</button>
        </div> */}
        <CRUDTable
          caption="History"
          fetchItems={payload => service.fetchItems(payload)}
          items={tasks[0]}
        // items={result}
        >
          <Fields>
            <Field
              name="title"
              label="Title"
              placeholder="title"
            />
            <Field
              name="id"
              label="Id"
              hideInCreateForm
              readOnly
            />
            <Field
              name="score"
              label="Score"
              placeholder="score"
            />
            <Field
              name="description"
              label="Description"
              render={DescriptionRenderer}
            />
          </Fields>

          <CreateForm
        title="Reviews Creation"
        message="Create a new Reviews!"
        trigger="Create Reviews"
        onSubmit={(e) => handleClickCreate(e)}
        submitText="Create"
        // validate={(values) => {
        //   const errors = {};
        //   if (!values.title) {
        //     errors.title = 'Please, provide task\'s title';
        //   }

        //   if (!values.description) {
        //     errors.description = 'Please, provide task\'s description';
        //   }

        //   return errors;
        // }}
      />


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

export default BoardReview