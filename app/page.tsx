import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BarChart2, Brain, Upload } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-20">
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold mb-6">Empower Your Data with ML Application</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Unlock the power of machine learning with our intuitive platform. 
          From data upload to model training and visualization, we've got you covered.
        </p>
        <div className="space-x-4">
          <Button asChild size="lg">
            <Link href="/auth">Get Started <ArrowRight className="ml-2" /></Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#features">Learn More</Link>
          </Button>
        </div>
      </section>

      <section id="features" className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-semibold mb-2">Easy Data Upload</h2>
          <p>Upload and manage your datasets with support for various file formats.</p>
        </div>
        <div className="text-center">
          <Brain className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-semibold mb-2">Intelligent Model Training</h2>
          <p>Train machine learning models with real-time feedback and progress tracking.</p>
        </div>
        <div className="text-center">
          <BarChart2 className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-semibold mb-2">Advanced Visualization</h2>
          <p>Explore your data and model results with powerful visualization tools.</p>
        </div>
      </section>

      <section className="text-center py-20 bg-secondary rounded-lg">
        <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Data?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of data scientists and ML enthusiasts who are already using our platform.
        </p>
        <Button asChild size="lg">
          <Link href="/auth">Sign Up Now <ArrowRight className="ml-2" /></Link>
        </Button>
      </section>
    </div>
  );
}