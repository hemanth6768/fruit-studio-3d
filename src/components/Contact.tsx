import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 text-primary">
          Get in Touch
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Have questions or want to know more? We'd love to hear from you!
        </p>

        <form className="space-y-6 bg-card p-8 rounded-2xl border border-border">
          <div>
            <Input
              placeholder="Your Name"
              className="bg-background border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Your Email"
              className="bg-background border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div>
            <Textarea
              placeholder="Your Message"
              rows={6}
              className="bg-background border-border text-foreground placeholder:text-muted-foreground resize-none"
            />
          </div>
          <Button className="w-full rounded-full" size="lg">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
