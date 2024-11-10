import { all, takeEvery } from "redux-saga/effects";
import { authApi } from "../../services/apis/auth";

function* logAction(action: any) {
  console.log("Action dispatched:", action);
  yield null;
}

// Watcher saga for logging all actions
function* watchAllActions() {
  yield takeEvery("*", logAction);
}

// Watcher saga for login
function* watchAuthActions() {
  yield takeEvery(authApi.endpoints.loginUser.matchFulfilled, function* (action) {
    console.log("Login info:", action.payload);
    yield null;
  });

  yield takeEvery(authApi.endpoints.loginUser.matchRejected, function* (action) {
    console.log("Login info:", action.error);
    yield null;
  });
}

export default function* rootSaga() {
  yield all([watchAllActions(), watchAuthActions()]);
}
