import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Footer } from '@/components/layout/Footer';
import { ProblemOfTheDay } from "@/components/ProblemOfTheDay"
import { 
  Accordion,
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { 
  ArrowRight, 
  Award, 
  Code, 
  Layers, 
  Video, 
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { getProblemOfTheDay } from '@/lib/api';
import { LandingNavbar } from '@/components/layout/LandingNavbar';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    icon: <Video className="h-8 w-8 text-primary" />,
    title: 'Collaborative Video Sessions',
    description: 'Solve problems with peers over video in a shared editor. Get 10 free sessions, then upgrade for unlimited collaboration.',
  },
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: 'Vast Problem Library',
    description: 'Explore a curated collection of coding challenges, from beginner-friendly to FAANG-level difficulty.',
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: 'Live Contests & Leaderboards',
    description: 'Test your skills in weekly and monthly contests. Climb the global leaderboards and earn recognition.',
  },
  {
    icon: <Layers className="h-8 w-8 text-primary" />,
    title: 'Grow Your Network',
    description: 'Connect with a vibrant community of developers. Share progress, discuss solutions, and build connections.',
  },
];

const faqs = [
  {
    question: "What is CodeArena?",
    answer: "CodeArena is a comprehensive platform for developers to practice coding problems, compete in contests, and connect with a community of peers. It's designed to help you improve your skills and prepare for technical interviews."
  },
  {
    question: "How does the collaborative video feature work?",
    answer: "Our core feature connects you with another developer on a video call within a shared coding environment to solve problems together. You get 10 free sessions. After that, you can subscribe to one of our premium plans for unlimited access."
  },
  {
    question: "Is CodeArena free to use?",
    answer: "Yes, the core features of CodeArena, including access to the problem library and community feed, are completely free. We offer premium plans for advanced features like unlimited collaborative sessions and private contests."
  },
  {
    question: "Can I create my own contests?",
    answer: "Absolutely! Our community contest feature allows you to create private contests for your friends, classmates, or company. You can select problems from our library and set your own rules."
  }
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
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
       <LandingNavbar />
       <main className="flex-1">
         <div className="absolute inset-x-0 top-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_1px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#8b5cf633,transparent)]" />
         </div>
        {/* Hero Section */}
        <motion.section
          className="relative w-full overflow-hidden flex items-center justify-center py-20 md:py-28"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div variants={itemVariants}>
               <h1 className="text-4xl font-extrabold tracking-tight font-headline sm:text-5xl md:text-6xl lg:text-7xl">
                Revolutionize Your <br className="md:hidden" />
                <span className="text-primary">Coding Skill with CodeArena.</span>
              </h1>
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
            >
              Practice DSA like never before — connect instantly with a peer and solve problems face-to-face.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow">
                <Link to="/create-account">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#features">View Features </a>
              </Button>
            </motion.div>
          </div>
        </motion.section>
        
        {/* Collaborative Feature Highlight */}
        <section className="py-20 sm:py-24">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="relative aspect-video rounded-xl shadow-2xl shadow-primary/20 border-2 border-primary/20 overflow-hidden">
                           <img 
                             src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
                             alt="Collaborative coding session with video call"
                             fill
                             className="object-cover"
                             data-ai-hint="video meeting screen"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
                           <div className="absolute bottom-4 left-4 flex gap-2">
                               <div className="w-24 h-16 bg-muted/50 backdrop-blur-sm rounded-md border border-white/20 p-1">
                                  <div className="w-full h-full bg-black rounded-sm relative">
                                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                          <Video className="h-6 w-6 text-white/50" />
                                      </div>
                                  </div>
                               </div>
                               <div className="w-24 h-16 bg-muted/50 backdrop-blur-sm rounded-md border border-white/20 p-1">
                                 <div className="w-full h-full bg-black rounded-sm relative">
                                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                          <Video className="h-6 w-6 text-white/50" />
                                      </div>
                                  </div>
                               </div>
                           </div>
                        </div>
                    </motion.div>
                     <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Badge variant="outline" className="mb-4">Core Feature</Badge>
                        <h2 className="text-3xl font-bold font-headline sm:text-4xl">Solve Problems Face-to-Face</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Experience the power of pair programming like never before. Connect with a random peer over video, share a real-time code editor, and tackle challenging problems together. It's the most effective way to learn, improve, and build connections.
                        </p>
                         <Button asChild size="lg" className="mt-8">
                            <Link href="/create-account">
                                Try It Now <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                         </Button>
                    </motion.div>
                </div>
            </div>
        </section>


        {/* Problem of the Day Section */}
        {problemOfTheDay && (
          <section className="py-20 sm:py-24 bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto px-4">
               <div className="mx-auto max-w-3xl text-center mb-12">
                  <h2 className="text-3xl font-bold font-headline sm:text-4xl flex items-center justify-center gap-3">Problem of the Day</h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                    Our daily challenge to keep your skills sharp.
                  </p>
                </div>
              <div className="max-w-4xl mx-auto">
                 <ProblemOfTheDay problem={problemOfTheDay} />
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section id="features" className="py-20 sm:py-24 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold font-headline sm:text-4xl">Everything You Need to Succeed</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A comprehensive suite of tools designed to elevate your coding skills, from novice to expert.
              </p>
            </div>
            <motion.div
              className="mx-auto mt-16 grid max-w-none grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
            >
              {features.map((feature) => (
                <motion.div key={feature.title} variants={itemVariants}>
                  <Card className="h-full transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 bg-card/50 backdrop-blur-lg border border-border/50">
                    <CardContent className="p-6">
                      <div className="mb-4">{feature.icon}</div>
                      <h3 className="font-headline text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>        

        {/* FAQ Section */}
        <section className="py-20 sm:py-24 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
             <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold font-headline sm:text-4xl">Frequently Asked Questions</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Find answers to common questions about CodeArena.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

export default Home;