-- Seed the products table with default products from the codebase
INSERT INTO public.products (id, name, slug, price, description, images, category, trending, popular) VALUES
('p-art-1', 'Handcrafted Canvas Art', 'handcrafted-canvas-art', 120, 'Vibrant handmade canvas perfect for modern interiors.', ARRAY['/placeholder.svg'], 'arts', true, false),
('p-decor-1', 'Ceramic Vase Duo', 'ceramic-vase-duo', 45, 'Minimal ceramic vases for home and office decor.', ARRAY['/placeholder.svg'], 'decorations', true, true),
('p-furn-1', 'Nordic Lounge Chair', 'nordic-lounge-chair', 240, 'Comfort-first lounge chair with solid wood legs.', ARRAY['/placeholder.svg'], 'furniture', false, true),
('p-decor-2', 'Framed Wall Art Set', 'framed-wall-art-set', 89, 'Set of 3 abstract wall art prints with frames.', ARRAY['/placeholder.svg'], 'decorations', true, false),
('p-furn-2', 'Minimal Study Desk', 'minimal-study-desk', 150, 'Space-saving desk with cable management.', ARRAY['/placeholder.svg'], 'furniture', false, false),
('p-decor-3', 'Office Desk Organizer', 'office-desk-organizer', 25, 'Keeps pens, notes, and accessories tidy.', ARRAY['/placeholder.svg'], 'decorations', false, false)
ON CONFLICT (id) DO NOTHING;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();