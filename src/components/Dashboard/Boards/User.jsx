import React from "react";
import CRUDTable,
{
  Fields,
  Field,
  UpdateForm,
  DeleteForm,
} from 'react-crud-table';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../redux/Actions/actions';
// Component's Base CSS
import './User.css';

const BoardUser = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const users = useSelector(state => state.allUsers)

  let tasks = [
    users.map(d => ({
      id: d._id,
      fullName: d.fullName,
      email: d.email,
      img: d.img,
      rol: d.rol,
      state: d.state
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
    let sorter = data.direction === 'ascending' ? SORTERS.STRING_ASCENDING(mapper) : SORTERS.STRING_DESCENDING(mapper);
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
    dispatch(deleteUser(e.id))
    window.location.reload()
  }

  return (
    <div>
      <div style={styles.container}>
        <CRUDTable
          caption="Users"
          fetchItems={payload => service.fetchItems(payload)}
          items={tasks[0]}
        >
          <Fields>
            <Field
              name="id"
              label="Id"
              hideInCreateForm
              hideInUpdateForm
              readOnly
            />
            <Field
              name="fullName"
              label="Name"
              placeholder="Loading name."
            />
            <Field
              name="email"
              label="E-mail"
              placeholder="Loading e-mail."
            />
            <Field
              name="rol"
              label="Role"
              placeholder="Loading role."
            />
          </Fields>

          <UpdateForm
            title="Modify User"
            message="Update various user's values."
            trigger="Update"
            onSubmit={task => service.update(task)}
            submitText="Update user"
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
            title="Delete user"
            message="Are you sure you want to delete this user?"
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
    </div>
  );
}

export default BoardUser