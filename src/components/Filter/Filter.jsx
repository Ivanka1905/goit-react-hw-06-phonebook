import PropTypes from 'prop-types';
import { Label, Input } from './Filter.styled';
import { useSelector, useDispatch } from 'react-redux'
import { filterContactAction, getFilter} from 'redux/contactsSlice';

const Filter = () => {
  const filter = useSelector(getFilter)
  const dispatch = useDispatch();
  return (
    <Label>
      Find contact by name
      <Input type="text" value={filter} onChange={()=>{dispatch(filterContactAction(filter.toLowerCase()))}}></Input>
    </Label>
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func,
};

export default Filter;
