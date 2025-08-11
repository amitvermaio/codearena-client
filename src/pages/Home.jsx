import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Code,
  Layers,
  Video,
  IndianRupee,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Footer } from "../components/layout/Footer";
import { ProblemOfTheDay } from "../components/ProblemOfTheDay";
import { getProblemOfTheDay } from "../lib/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Badge } from "../components/ui/badge";

const features = [
  {
    icon: <Video className="h-8 w-8 text-primary" />,
    title: "Collaborative Video Sessions",
    description:
      "Solve problems with peers over video in a shared editor. Get 10 free sessions, then upgrade for unlimited collaboration.",
  },
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: "Vast Problem Library",
    description:
      "Explore a curated collection of coding challenges, from beginner-friendly to FAANG-level difficulty.",
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "Live Contests & Leaderboards",
    description:
      "Test your skills in weekly and monthly contests. Climb the global leaderboards and earn recognition.",
  },
  {
    icon: <Layers className="h-8 w-8 text-primary" />,
    title: "Grow Your Network",
    description:
      "Connect with a vibrant community of developers. Share progress, discuss solutions, and build connections.",
  },
];

const faqs = [
  {
    question: "What is CodeArena?",
    answer:
      "CodeArena is a comprehensive platform for developers to practice coding problems, compete in contests, and connect with a community of peers. It's designed to help you improve your skills and prepare for technical interviews.",
  },
  {
    question: "How does the collaborative video feature work?",
    answer:
      "Our core feature connects you with another developer on a video call within a shared coding environment to solve problems together. You get 10 free sessions. After that, you can subscribe to one of our premium plans for unlimited access.",
  },
  {
    question: "Is CodeArena free to use?",
    answer:
      "Yes, the core features of CodeArena, including access to the problem library and community feed, are completely free. We offer premium plans for advanced features like unlimited collaborative sessions and private contests.",
  },
  {
    question: "Can I create my own contests?",
    answer:
      "Absolutely! Our community contest feature allows you to create private contests for your friends, classmates, or company. You can select problems from our library and set your own rules.",
  },
];

const Home = () => {
  const [problemOfTheDay, setProblemOfTheDay] = useState(null);

  useEffect(() => {
    getProblemOfTheDay().then(setProblemOfTheDay);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        {/* Hero Section */}
        <motion.section
          className="relative w-full flex items-center justify-center py-20 md:py-28"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
                Revolutionize Your{" "}
                <span className="text-primary">Coding Skill with CodeArena.</span>
              </h1>
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
            >
              Practice DSA like never before — connect instantly with a peer and
              solve problems face-to-face.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button size="lg" asChild className="shadow-lg hover:shadow-primary/50">
                <Link to="/create-account">
                  Start Your 10 Free Sessions <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#pricing">View Pricing</a>
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* Feature Section */}
        <section className="py-20 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative aspect-video rounded-xl shadow-2xl border-2 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
                    alt="Collaborative coding session"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div>
                <Badge variant="outline" className="mb-4">
                  Core Feature
                </Badge>
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Solve Problems Face-to-Face
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Experience the power of pair programming like never before.
                </p>
                <Button size="lg" className="mt-8" asChild>
                  <Link to="/create-account">
                    Try It Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Problem of the Day */}
        {problemOfTheDay && (
          <section className="py-20 sm:py-24">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">Problem of the Day</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Our daily challenge to keep your skills sharp.
                </p>
              </div>
              <ProblemOfTheDay problem={problemOfTheDay} />
            </div>
          </section>
        )}

        {/* Features Grid */}
        <section id="features" className="py-20 sm:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
            >
              {features.map((f) => (
                <motion.div key={f.title} variants={itemVariants}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="mb-4">{f.icon}</div>
                      <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {f.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 sm:py-24 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Pricing Plans</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Choose a plan that works for you.
              </p>
            </div>
            <div className="text-center text-muted-foreground">
              <p className="italic">[Pricing Cards will be displayed here]</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            </div>
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
                <AccordionItem value={`item-${i}`} key={i}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
