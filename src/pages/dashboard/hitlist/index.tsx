import Link from "next/link";
import { HiPlus, HiStar } from "react-icons/hi";
import { EmptyState } from "~/features/common/EmptyState";

import { Text, Button, Skeleton } from "~/ui";
import { getDashboardLayout } from "~/features/layout";
import { type NextPageWithLayout } from "~/types/next-app";
import { trpc, type RouterOutputs } from "~/utils/trpc";

const HitlistPage: NextPageWithLayout = () => {
  const hitlistQuery = trpc.hitlist.getHitlistFromUser.useQuery();
  const hasHitlist = Number(hitlistQuery.data?.length) > 0;
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <HiStar />
          <Text className="text-2xl font-bold">Hitlist</Text>
        </div>
        <Button
          as={Link}
          href="/dashboard/hitlist/new"
          variant="filled"
          size="lg"
        >
          <HiPlus />
          New Hitlist
        </Button>
      </div>
      <Text className="text-lg leading-8 text-sand-10">
        Create and manage hitlist
      </Text>
      <div className="mt-12">
        {hitlistQuery.status === "success" && (
          <>
            {hasHitlist && <HitlistList hitlists={hitlistQuery.data} />}
            {!hasHitlist && (
              <EmptyState
                ctaLabel="New Hitlist"
                ctaHref="/dashboard/hitlist/new"
                icon={<HiStar />}
                title="No Hitlist posted"
                description="You don't have any hitlist yet. Create your first one!"
              />
            )}
          </>
        )}
      </div>
      {hitlistQuery.status === "loading" && <HitlistLoadingList />}
    </div>
  );
};

export default HitlistPage;
HitlistPage.getLayout = getDashboardLayout;

const HitlistLoadingList = () => (
  <div className="flex flex-col gap-4">
    {[...Array(5).keys()].map((index) => (
      <Skeleton key={index} className="h-20 w-full" />
    ))}
  </div>
);

type HitlistListProps = {
  hitlists: RouterOutputs["hitlist"]["getHitlistFromUser"];
};

const HitlistList = ({ hitlists }: HitlistListProps) => {
  return (
    <div>
      {hitlists?.map((hitlist) => (
        <HitlistItem key={hitlist.id} hitlist={hitlist} />
      ))}
    </div>
  );
};

type HitlistItemProps = {
  hitlist: HitlistListProps["hitlists"][number];
};

const HitlistItem = ({ hitlist }: HitlistItemProps) => {
  return (
    <Link href={`/dashboard/hitlist/${hitlist.id}`}>
      <div className="cursor-point group relative flex items-center justify-between rounded border border-sand-6 bg-sand-1 px-6 py-4 hover:bg-sand-4">
        <div className="flex items-center gap-4">
          <HiStar />
          <Text className="text-lg font-bold">{hitlist.title}</Text>
        </div>
        <div>{hitlist?._count?.places} Places</div>
      </div>
    </Link>
  );
};
