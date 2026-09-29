import PageHead from "@/components/PageHead"
import WhyChooseUs from "@/components/WhyChooseUs"

export const metadata = { title: "About | Rackwell Steel" }

export default function About() {
  return (
    <>
      <PageHead title="Built on the shop floor" text="Rackwell started as a two-person welding bay. Today we make racking for warehouses, workshops and shops across the country." />
      <section className="section">
        <div className="wrap">
          <div className="two">
            <div>
              <h2>Steel we can vouch for</h2>
            </div>
            <div>
              <p>We roll, punch, weld and powder coat every profile in our own plant, so we know what goes into each bay and how much it can carry.</p>
              <p>Our designers work from your floor plan, aisle widths and forklift specs. Our crews then install the result and leave a load plate on every bay.</p>
            </div>
          </div>
          <div className="stats">
            <div className="stat"><b>18</b>years making racks</div>
            <div className="stat"><b>6,400</b>installations delivered</div>
            <div className="stat"><b>10 yr</b>frame warranty</div>
          </div>
        </div>
      </section>
      <WhyChooseUs />
    </>
  )
}
