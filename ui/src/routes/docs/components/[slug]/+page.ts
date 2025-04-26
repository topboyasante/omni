export async function load({ params }) {
    const post = await import(`../../../../content/components/${params.slug}.md`);
    const metadata = post.metadata;
  
    const content = post.default;
  
    return {
      content,
      metadata
    };
  }