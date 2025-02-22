import { Component, ReactElement } from 'react';
import { observer, inject } from 'mobx-react';
import TodosWebview from '../components/TodosWebview';
import ErrorBoundary from '../../../components/util/ErrorBoundary';
import { todosStore } from '..';
import { TODOS_MIN_WIDTH } from '../../../config';
import { todoActions } from '../actions';
import { RealStores } from '../../../stores';

interface IProps {
  stores?: RealStores;
}

@inject('stores', 'actions')
@observer
class TodosScreen extends Component<IProps> {
  render(): ReactElement | null {
    const showTodoScreen =
      !todosStore ||
      !todosStore.isFeatureActive ||
      todosStore.isTodosPanelForceHidden;

    if (showTodoScreen) {
      return null;
    }

    return (
      <ErrorBoundary>
        <TodosWebview
          isTodosServiceActive={
            this.props.stores!.services.isTodosServiceActive || false
          }
          isVisible={todosStore.isTodosPanelVisible}
          // togglePanel={todoActions.toggleTodosPanel} // TODO - [TECH DEBT][PROP NOT USED IN COMPONENT] check it later
          handleClientMessage={todoActions.handleClientMessage}
          setTodosWebview={webview => todoActions.setTodosWebview(webview)}
          width={todosStore.width}
          minWidth={TODOS_MIN_WIDTH}
          resize={width => todoActions.resize(width)}
          userAgent={todosStore.userAgent}
          todoUrl={todosStore.todoUrl}
          isTodoUrlValid={todosStore.isTodoUrlValid}
        />
      </ErrorBoundary>
    );
  }
}

export default TodosScreen;
