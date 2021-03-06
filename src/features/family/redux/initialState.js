import { Treeview } from 'react-bootstrap-front';

const initialState = {
  items: [],
  tree: new Treeview({
    parent: 'parent',
    position: 'fam_position',
    left: 'fam_left',
    right: 'fam_right',
    level: 'fam_level',
    label: 'fam_name',
    root: 'Stock',
  }),
  loadChildrenPending: false,
  loadChildrenError: null,
  loadChildrenFinished: false,
  loadOnePending: false,
  loadOneError: null,
  loadOneItem: null,
  createOnePending: false,
  createOneError: null,
  delOnePending: false,
  delOneError: null,
  updateOnePending: false,
  updateOneError: null,
};

export default initialState;
