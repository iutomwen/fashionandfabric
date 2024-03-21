import { readUserSession } from "@/utils/actions";
import EditProfileForm from "./components/EditProfileForm";
import { Separator } from "@/components/ui/separator";

export default async function page() {
  const { user, session } = await readUserSession();
  return (
    <div className="space-y-6 max-w-screen-md">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <EditProfileForm user={user} session={session?.data.session as any} />
    </div>
  );
}
