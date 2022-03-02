import { useEffect } from "react";
import { findUser } from "../../services/userMgm/userApi";

const useFindUser = (params, dispatch) => {
  useEffect(() => {
    dispatch({ type: "update", payload: { loading: true } });
    findUser(params).then((res) => {
      if (res) {
        dispatch({
          type: "update",
          payload: {
            userList: res.data.list,
            loading: false,
          },
        });
      } else {
        dispatch({
          type: "update",
          payload: {
            loading: false,
          },
        });
      }
    });
  }, [params, dispatch]);
};

export { useFindUser };
