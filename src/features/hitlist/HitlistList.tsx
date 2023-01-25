import { trpc, type RouterOutputs } from "~/utils/trpc";

export const HitlistList = () => {
  const hitlistQuery = trpc.hitlist.getHitlistFromUser.useQuery();
  return (
    <div>
      {hitlistQuery.data?.map((hitlist) => (
        <div key={hitlist.id}>{hitlist.title}</div>
      ))}
    </div>
  );
};
