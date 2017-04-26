import {observable, computed, autorun} from 'mobx';



export class ObservableTodoStore {
    @observable user = {uid: 79};
}

export default ObservableTodoStore;
