import { Button } from "@/components/ui/button";

export default function UiPage() {
  return (
    <div className="space-y-6 p-8">
      <div className="space-x-2">
        <Button size="sm">Primary</Button>
        <Button variant="outline" size="sm">
          Outline
        </Button>
        <Button variant="ghost" size="sm">
          Ghost
        </Button>
        <Button size="sm" disabled>
          Disabled
        </Button>
        <Button size="sm" isLoading>
          Loading
        </Button>
      </div>
      <div className="space-x-2">
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button disabled>Disabled</Button>
        <Button isLoading>Loading</Button>
      </div>
      <div className="space-x-2">
        <Button size="lg">Primary</Button>
        <Button variant="outline" size="lg">
          Outline
        </Button>
        <Button variant="ghost" size="lg">
          Ghost
        </Button>
        <Button size="lg" disabled>
          Disabled
        </Button>
        <Button size="lg" isLoading>
          Loading
        </Button>
      </div>
      <div className="space-x-2">
        <Button asChild>
          <a href="#">As Link</a>
        </Button>
      </div>
    </div>
  );
}
