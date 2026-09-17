(() => {
  const ownScript = document.currentScript;
  const baseScriptUrl = ownScript?.src
    ? new URL('site-header-base.js?v=20260916-placepath-final', ownScript.src).href
    : '../assets/js/site-header-base.js?v=20260916-placepath-final';

  const enhancePlacePath = () => {
    if (!document.body.classList.contains('placepath-page')) return;

    const assetBase = '../assets/case-studies/placepath/';
    const setText = (selector, text) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = text;
    };

    if (!document.querySelector('style[data-placepath-final-evidence]')) {
      const style = document.createElement('style');
      style.dataset.placepathFinalEvidence = '';
      style.textContent = `
        .placepath-page .placepath-evolution {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .placepath-page .placepath-evolution figure,
        .placepath-page .placepath-comparison figure {
          min-width: 0;
        }

        .placepath-page [data-placepath-evidence="scope"] {
          grid-template-columns: minmax(0, 1fr) minmax(320px, .9fr);
          align-items: start;
        }

        .placepath-page [data-placepath-evidence="scope"] .placepath-evidence__copy {
          max-width: 38rem;
        }

        .placepath-page [data-placepath-evidence="scope"] figure {
          display: block;
          margin: 0;
        }

        @media (max-width: 900px) {
          .placepath-page .placepath-evolution,
          .placepath-page [data-placepath-evidence="scope"] {
            grid-template-columns: 1fr;
          }
        }
      `;
      document.head.append(style);
    }

    // Use a scoped flow artefact beside the decision copy instead of detailed client user stories.
    const scopeEvidence = document.querySelector('[data-placepath-evidence="scope"]');
    if (scopeEvidence) {
      let scopeFigure = scopeEvidence.querySelector('figure');
      if (!scopeFigure) {
        scopeFigure = document.createElement('figure');
        scopeEvidence.append(scopeFigure);
      }
      scopeFigure.innerHTML = '<img src="../Placepath_Scope_Flow.png" alt="PlacePath scope flow showing part of the product flow thinking used to define the first release" loading="lazy" decoding="async">';
    }

    // Make the later interactive prototype explicitly separate from the commissioned client work.
    setText('.placepath-prototype-feature .section-label', 'Independent continuation');
    setText('#prototype-title', 'Explore the interactive PlacePath prototype');
    setText(
      '#prototype-title + p',
      'After the client project was paused, I independently developed PlacePath into the interactive prototype shown here. This later prototype was not part of the commissioned client work; I created it to explore how the complete product could feel and behave.'
    );

    // Second decision: show the journey moving from requirement and low fidelity into a clearer creation model.
    const evolutionSection = document.querySelector('section[aria-labelledby="evolution-title"]');
    const evolution = evolutionSection?.querySelector('.placepath-evolution');
    if (evolution) {
      const figures = [...evolution.querySelectorAll('figure')];
      const midFigure = figures.find((figure) => figure.querySelector('img[src*="mid-fi-wireframe"], img[src*="mid-fi-create"]'));
      if (midFigure) {
        const img = midFigure.querySelector('img');
        const caption = midFigure.querySelector('figcaption');
        if (img) {
          img.src = `${assetBase}placepath-mid-fidelity-create-plan.png`;
          img.alt = 'Mid-fidelity PlacePath create-plan screen showing progressive placement-plan creation and a separate preview stage';
        }
        if (caption) caption.innerHTML = '<strong>Mid fidelity:</strong> shape progressive creation and the relationship between Create Plan and Preview Plan.';
      }

      if (!evolution.querySelector('[data-placepath-fidelity="high-create"]')) {
        const figure = document.createElement('figure');
        figure.dataset.placepathFidelity = 'high-create';
        figure.innerHTML = `
          <img src="${assetBase}placepath-high-fidelity-create-plan.png" alt="High-fidelity PlacePath create-plan interface with learning objectives, schedule choices and a separate Preview Plan stage" loading="lazy" decoding="async">
          <figcaption><strong>High fidelity:</strong> refine the creation model into a clear, production-ready planning experience.</figcaption>
        `;
        evolution.append(figure);
      }
    }

    // Third decision: make the separate review state visible in both mid and high fidelity.
    const workflowSection = document.querySelector('section[aria-labelledby="workflow-title"]');
    const comparisonFigures = workflowSection?.querySelectorAll('.placepath-comparison figure');
    if (comparisonFigures?.length >= 2) {
      const midFigure = comparisonFigures[0];
      const highFigure = comparisonFigures[1];
      const midImg = midFigure.querySelector('img');
      const highImg = highFigure.querySelector('img');
      const midCaption = midFigure.querySelector('figcaption');
      const highCaption = highFigure.querySelector('figcaption');

      if (midImg) {
        midImg.src = `${assetBase}placepath-mid-fidelity-preview-plan.png`;
        midImg.alt = 'Mid-fidelity PlacePath Preview Plan screen bringing the complete plan together before final actions';
      }
      if (highImg) {
        highImg.src = `${assetBase}placepath-high-fidelity-preview-plan.png`;
        highImg.alt = 'High-fidelity PlacePath Preview Plan screen showing the completed plan before submission, printing or sharing';
      }
      if (midCaption) midCaption.innerHTML = '<strong>Mid fidelity:</strong> establish Preview Plan as a distinct review stage.';
      if (highCaption) highCaption.innerHTML = '<strong>High fidelity:</strong> review the complete plan before submitting, printing or sharing.';
    }

    // Replace the speculative ending with the actual client outcome.
    setText('section[aria-labelledby="delivery-title"] > .section-label', 'Outcome');
    setText('#delivery-title', 'Approved for development, then paused');
    setText(
      '#delivery-title + p',
      'The design direction was approved by the client and handed to developers. Development began, but the wider project was later put on pause before launch.'
    );

    const deliveryFigure = document.querySelector('section[aria-labelledby="delivery-title"] .placepath-delivery-visual');
    const deliveryImage = deliveryFigure?.querySelector('img');
    const deliveryCaption = deliveryFigure?.querySelector('figcaption');
    if (deliveryImage) {
      deliveryImage.src = `${assetBase}placepath-independent-prototype-dashboard.webp`;
      deliveryImage.alt = "PlacePath dashboard from Sophie Purewal's later independent interactive prototype";
    }
    if (deliveryCaption) {
      deliveryCaption.textContent = 'After the commissioned project paused, I independently continued the concept into the interactive prototype shown in this case study.';
    }

    const deliverySection = document.querySelector('section[aria-labelledby="delivery-title"]');
    const deliveryParagraphs = deliverySection ? [...deliverySection.querySelectorAll(':scope > p')] : [];
    const lastDeliveryParagraph = deliveryParagraphs.at(-1);
    if (lastDeliveryParagraph && lastDeliveryParagraph !== document.querySelector('#delivery-title + p')) {
      lastDeliveryParagraph.textContent = 'The client-approved work established the core product journeys, responsive patterns and UI foundation for development. The interactive prototype shown here is my later independent continuation and was not part of the commissioned client work.';
    }
  };

  const runEnhancements = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', enhancePlacePath, { once: true });
    } else {
      enhancePlacePath();
    }
  };

  const baseScript = document.createElement('script');
  baseScript.src = baseScriptUrl;
  baseScript.async = false;
  baseScript.addEventListener('load', runEnhancements, { once: true });
  document.head.append(baseScript);
})();
