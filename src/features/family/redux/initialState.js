import { Treeview } from 'freeassofront';

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
};

export default initialState;
