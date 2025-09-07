-- Update RLS policies to use the correct admin email
-- Drop existing policies first
DROP POLICY IF EXISTS "Only admin can view orders" ON orders;
DROP POLICY IF EXISTS "Only admin can update orders" ON orders;
DROP POLICY IF EXISTS "Only admin can delete orders" ON orders;
DROP POLICY IF EXISTS "Only admin can modify products" ON products;

-- Create new policies with correct admin email
CREATE POLICY "Only admin can view orders" 
ON orders FOR SELECT 
USING ((auth.jwt() ->> 'email') = 'kelvinpius817@gmail.com');

CREATE POLICY "Only admin can update orders" 
ON orders FOR UPDATE 
USING ((auth.jwt() ->> 'email') = 'kelvinpius817@gmail.com')
WITH CHECK ((auth.jwt() ->> 'email') = 'kelvinpius817@gmail.com');

CREATE POLICY "Only admin can delete orders" 
ON orders FOR DELETE 
USING ((auth.jwt() ->> 'email') = 'kelvinpius817@gmail.com');

CREATE POLICY "Only admin can modify products" 
ON products FOR ALL 
USING ((auth.jwt() ->> 'email') = 'kelvinpius817@gmail.com')
WITH CHECK ((auth.jwt() ->> 'email') = 'kelvinpius817@gmail.com');