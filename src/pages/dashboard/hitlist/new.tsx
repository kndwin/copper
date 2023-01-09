import { Page } from "~/features/layout";
import { type NextPageWithLayout } from "~/types/next-app";
import { HitlistContent, HitlistHeader } from "~/features/hitlist";

const NewHitlistPage: NextPageWithLayout = () => {
  return (
    <Page>
      <HitlistHeader />
      <main className="p-4">
        <HitlistContent />
      </main>
    </Page>
  );
};

export default NewHitlistPage;
