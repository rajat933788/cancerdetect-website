import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center p-8 bg-white shadow">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Welcome to the Thyroid Cancer Awareness Platform
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-3xl">
          Empowering communities with knowledge and resources about thyroid cancer.
          Explore reliable data, AI-powered insights, and trusted resources to stay informed.
        </p>
        <div className="flex gap-4">
          <Button asChild variant="secondary" className="bg-red-500 text-white hover:bg-red-600 font-semibold px-8 py-4 rounded-full shadow transition-all">
            <a href="#learn-more">Learn More</a>
          </Button>
          <Button asChild variant="secondary" className="bg-red-500 text-white hover:bg-red-600 font-semibold px-8 py-4 rounded-full shadow transition-all">
            <a href="#resources">Resources</a>
          </Button>
        </div>
      </header>

      {/* Image Section */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-8 p-8 bg-gray-100">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1DpkDI1fmUEfzfuH5pYYPmdopIggNkAkYQA&s"
          alt="Thyroid Cancer Awareness"
          className="rounded-xl shadow-lg w-80"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsAGbEpT3D5CkK7YMM9UoBVFR3rdzM6eAg7w&s"
          alt="Healthcare Awareness"
          className="rounded-xl shadow-lg w-80"
        />
      </section>

      {/* About Section */}
      <section id="learn-more" className="p-8 bg-white shadow">
        <h2 className="text-3xl font-bold mb-6 text-center">About Thyroid Cancer</h2>
        <div className="max-w-4xl mx-auto space-y-6 text-lg leading-relaxed">
          <p>
            <strong>Thyroid cancer</strong> occurs in the thyroid gland, which plays a crucial role in regulating metabolism and growth. While most thyroid nodules are benign, some can develop into cancer. Early detection significantly improves outcomes.
            <a href="https://www.who.int/health-topics/cancer" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline"> Learn more about cancer</a>.
          </p>
          <p>
            Thyroid diseases, including thyroid cancer, affect millions globally, with women being disproportionately impacted. Iodine deficiency remains a key risk factor in many parts of the world.
            <a href="https://www.who.int/health-topics/thyroid-disease" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline"> See more on thyroid diseases</a>.
          </p>
          <p>
            Our platform is dedicated to spreading awareness, offering AI-based insights to assist in early identification, and providing access to trusted global resources like the WHO and educational articles.
          </p>
          <p>
            Knowledge is power. With awareness, timely diagnosis, and access to resources, we can make informed choices that save lives.
          </p>
        </div>
      </section>

      {/* Post-login Features */}
      <section className="w-full py-10 sm:py-12 md:py-16 lg:py-20 bg-white">
  <div className="container mx-auto px-4 md:px-6 max-w-6xl">
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
      
      {/* Left: Text Content */}
      <div className="text-center md:text-left space-y-4 md:space-y-6 md:flex-1 max-w-xl mx-auto md:mx-0">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
          What Can You Do After Logging In?
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Access personalized tools and insights to help you understand cancer and thyroid conditions better.
          Use our prediction tool, explore interactive dashboards, and share your experiences to help others.
        </p>
        <div className="px-4 md:px-0">
          <ul className="list-disc text-left space-y-2 pl-5 text-sm sm:text-base text-gray-700">
            <li>Get predictions based on your health data</li>
            <li>Explore real-time dashboards and statistics</li>
            <li>Submit your own testimonial to inspire others</li>
            <li>Stay updated with the latest research and news</li>
          </ul>
        </div>
        <div className="pt-2 md:pt-4">
          <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-medium">
          <Link to="/login">Log In</Link>
          </Button>
        </div>
      </div>

      {/* Right: Logo */}
      <div className="flex justify-center md:justify-end md:flex-1 mt-8 md:mt-0">
        <img
          src="/logo.png"
          alt="Thyroid Cancer Awareness Logo"
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-80 md:h-80 object-contain rounded-lg shadow-md border border-gray-200 p-2 bg-white"
        />
      </div>
    </div>
  </div>
</section>


      {/* Resources Section */}
      <section id="resources" className="p-8 bg-gray-100 shadow">
        <h2 className="text-3xl font-bold mb-6 text-center">Trusted Resources</h2>
        <ul className="space-y-4 max-w-3xl mx-auto text-lg">
          <li>
            <a href="https://www.who.int/health-topics/cancer" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
              World Health Organization - Cancer
            </a>
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/Cancer" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
              Wikipedia - Cancer Overview
            </a>
          </li>
          <li>
            <a href="https://www.who.int/health-topics/thyroid-disease" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
              World Health Organization - Thyroid Disease
            </a>
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/Thyroid" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
              Wikipedia - Thyroid Information
            </a>
          </li>
        </ul>
      </section>

      {/* FAQ Section */}
      <section className="p-8 bg-white shadow">
  <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
  <div className="max-w-4xl mx-auto text-lg">
    <Accordion type="multiple">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is early detection for thyroid cancer?</AccordionTrigger>
        <AccordionContent>
          Early detection means identifying cancer before symptoms arise, which significantly increases the chances of successful treatment. Regular screenings and knowing the warning signs are key. 
          <a href="https://www.cancer.org/healthy/find-cancer-early.html" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline"> Learn more about early detection</a>.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>What are common thyroid symptoms?</AccordionTrigger>
        <AccordionContent>
          Common symptoms include weight changes, fatigue, temperature sensitivity, and swelling in the neck. Always consult a doctor for accurate diagnosis. 
          <a href="https://www.mayoclinic.org/diseases-conditions/thyroid-disease/symptoms-causes/syc-20351653" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline"> See more symptoms</a>.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>How can AI tools assist in thyroid health?</AccordionTrigger>
        <AccordionContent>
          AI tools can help analyze patterns in medical data, predict risks based on individual health inputs, and support doctors in diagnosis. These tools are not a replacement for medical advice but provide helpful insights.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger>Where can I find trusted thyroid cancer resources?</AccordionTrigger>
        <AccordionContent>
          Our platform connects you to reliable sources like WHO, Mayo Clinic, and other trusted health portals. Stay informed and proactive in managing your health.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5">
        <AccordionTrigger>What are the different types of thyroid cancer?</AccordionTrigger>
        <AccordionContent>
          There are four main types of thyroid cancer: papillary (most common), follicular, medullary, and anaplastic (most aggressive). Each type affects different thyroid cells and has varying treatment approaches and prognosis. 
          <a href="https://www.cancer.org/cancer/thyroid-cancer/about/what-is-thyroid-cancer.html" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline"> Learn about thyroid cancer types</a>.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-6">
        <AccordionTrigger>What are risk factors for developing thyroid cancer?</AccordionTrigger>
        <AccordionContent>
          Risk factors include exposure to radiation, family history of thyroid cancer, certain genetic conditions, being female, and iodine deficiency. However, many people with thyroid cancer have no known risk factors, and most people with risk factors don't develop the disease.
          <a href="https://www.cancer.net/cancer-types/thyroid-cancer/risk-factors" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline"> More about risk factors</a>.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-7">
        <AccordionTrigger>How is thyroid cancer diagnosed?</AccordionTrigger>
        <AccordionContent>
          Diagnosis typically involves physical examination, blood tests to check thyroid function, ultrasound imaging, fine-needle aspiration biopsy, and sometimes molecular testing of the biopsy sample. Additional imaging tests may be needed to determine if cancer has spread.
          <a href="https://www.thyroid.org/thyroid-cancer/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline"> Understand diagnosis procedures</a>.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-8">
        <AccordionTrigger>What treatments are available for thyroid cancer?</AccordionTrigger>
        <AccordionContent>
          Treatments typically include surgery to remove part or all of the thyroid gland, radioactive iodine therapy, thyroid hormone therapy, external beam radiation, targeted drug therapy, and chemotherapy. The specific approach depends on the cancer type, stage, and individual factors.
          <a href="https://www.nccn.org/patients/guidelines/content/PDF/thyroid-patient.pdf" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline"> Treatment guidelines</a>.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-9">
        <AccordionTrigger>What is the thyroid-stimulating hormone (TSH) test?</AccordionTrigger>
        <AccordionContent>
          The TSH test measures the level of thyroid-stimulating hormone in your blood. This test helps evaluate thyroid function and can indicate hyper- or hypothyroidism. While not diagnostic for cancer itself, it's often part of the initial assessment of thyroid health.
          <a href="https://www.thyroid.org/thyroid-function-tests/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline"> More about thyroid testing</a>.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-10">
        <AccordionTrigger>How does life change after thyroid cancer treatment?</AccordionTrigger>
        <AccordionContent>
          After treatment, many people need lifelong thyroid hormone replacement therapy. Regular follow-up appointments are necessary to monitor for recurrence. While most people return to normal activities, some may experience fatigue, voice changes, or calcium level issues. Support groups can help with emotional adjustment.
          <a href="https://www.cancer.net/survivorship" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline"> Cancer survivorship resources</a>.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-11">
        <AccordionTrigger>What is the relationship between thyroid nodules and cancer?</AccordionTrigger>
        <AccordionContent>
          Thyroid nodules are quite common, with over 90% being benign (non-cancerous). However, a small percentage can be malignant. Factors that increase suspicion include rapid growth, family history of thyroid cancer, nodule hardness, lymph node swelling, and certain ultrasound characteristics.
          <a href="https://www.endocrine.org/patient-engagement/endocrine-library/thyroid-nodules" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline"> Understanding thyroid nodules</a>.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-12">
        <AccordionTrigger>How does diet affect thyroid health?</AccordionTrigger>
        <AccordionContent>
          A balanced diet with adequate iodine is important for thyroid health. However, extremely high iodine intake can be problematic for some people. Foods containing goitrogens (like raw cruciferous vegetables) may affect thyroid function when consumed in very large amounts. Selenium and zinc are also important minerals for thyroid health.
          <a href="https://www.thyroid.org/iodine-deficiency/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline"> Learn about nutrition and thyroid</a>.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</section>
    </div>
  );
};

export default Welcome;
