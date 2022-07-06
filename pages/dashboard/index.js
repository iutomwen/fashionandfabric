import AppLayout from "@/components/Auth/AppLayout";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  countTotalMessages,
  countTotalPaidSubcriptions,
  countTotalProducts,
  countTotalUsers,
} from "@/utils/services";
import { useRouter } from "next/router";
import withAuth from "@/components/Auth/withAuth";
import { StatsBoard } from "@/components/Dashboard/StatsBoard";
import LoadingBox from "@/components/Global/LoadingBox";
import { UsersList } from "@/components/Dashboard/UsersList";
import { fetchUsersDetails } from "@/utils/slices/usersSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { users, loading } = useSelector((state) => state.users);
  //   console.log(users.length);
  const [totalUsers, setTotalUsers] = React.useState(0);
  const [totalProducts, setTotalProducts] = React.useState(0);
  const [totalPaidSubscriptions, setTotalPaidSubscriptions] = React.useState(0);
  const [totalMessages, setTotalMessages] = React.useState(0);
  const data = [
    {
      title: "Products",
      icon: "receipt",
      value: totalProducts,
      diff: 34,
    },
    {
      title: "Users",
      icon: "users",
      value: totalUsers,
      diff: -13,
    },
    {
      title: "Paid Subscriptions",
      icon: "discount",
      value: totalPaidSubscriptions,
      diff: -8,
    },
    {
      title: "Messages",
      icon: "messages",
      value: totalMessages,
      //   diff: -30,
    },
  ];

  const getUsers = React.useCallback(async () => {
    const limit = 10;
    dispatch(fetchUsersDetails(limit));
  }, [dispatch]);

  const getTotalUsers = React.useCallback(async () => {
    try {
      const { count, error } = await countTotalUsers();
      if (error) throw error;
      setTotalUsers(count);
    } catch (error) {}
  }, []);

  const getTotalProducts = React.useCallback(async () => {
    try {
      const { count, error } = await countTotalProducts();
      if (error) throw error;
      setTotalProducts(count);
    } catch (error) {}
  }, []);

  const getTotalPaidSubscriptions = React.useCallback(async () => {
    try {
      const { count, error } = await countTotalPaidSubcriptions();
      if (error) throw error;
      setTotalPaidSubscriptions(count);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getTotalMessages = React.useCallback(async () => {
    try {
      const { count, error } = await countTotalMessages();
      if (error) throw error;
      setTotalMessages(count);
    } catch (error) {
      console.log(error);
    }
  }, []);

  React.useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      getTotalUsers();
      getTotalProducts();
      getTotalPaidSubscriptions();
      getTotalMessages();
      getUsers();
    }
    return () => {
      isCancelled = true;
    };
  }, [
    getTotalMessages,
    getTotalPaidSubscriptions,
    getTotalProducts,
    getTotalUsers,
    getUsers,
  ]);

  return (
    <AppLayout>
      {loading ? (
        <LoadingBox color="red" />
      ) : (
        <div className="flex flex-col space-y-4">
          <StatsBoard data={data} />
          {users.length > 0 && <UsersList data={users} />}
        </div>
      )}
    </AppLayout>
  );
}

export default withAuth(Dashboard);
