import React from "react";

function SizeChart() {
  return (
    <div className="text-center">
      <strong>Men's Size Chart</strong>
      <p>
        Please provide Chest, Waist, Shoulder, and Sleeve Length. If you need
        help choosing your size.
      </p>
      <div className="mx-auto mt-10 flex flex-col items-center">
        <img src="./size.jpg" width={500} height={600} alt="Mens size Chart" />
        <table
          className="mx-auto border border-solid border-black"
          style={{ margin: "20px auto", display: "block" }}
        >
          <tbody>
            <tr className="h-11 border-b">
              <td className="w-[1000px]">
                <strong>Size</strong>
              </td>
              <td className="w-[1000px]">
                <strong>Inch</strong>
              </td>
              <td className="w-[1000px]">
                <strong>Shoulder</strong>
              </td>
              <td className="w-[1000px]">
                <strong>Chest-Allaround</strong>
              </td>
              <td className="w-[1000px]">
                <strong>Sleeve</strong>
              </td>
              <td className="w-[1000px]">
                <strong>HPS Front</strong>
              </td>
              <td className="w-[1000px]">
                <strong>HPS Back</strong>
              </td>
              <td className="w-[1000px]">
                <strong>Bottom Hem</strong>
              </td>
            </tr>
            <tr className="h-11">
              <td className="w-[967.938px]">S</td>
              <td className="w-[80.0625px]">INCH</td>
              <td className="w-[524px]">17 5/8</td>
              <td className="w-[524px]">43</td>
              <td className="w-[524px]">25 1/2</td>
              <td className="w-[524px]">26 3/8</td>
              <td className="w-[524px]">25 5/8</td>
              <td className="w-[524px]">38 1/2</td>
            </tr>
            <tr className="h-[68.8333px]">
              <td className="w-[967.938px]">M</td>
              <td className="w-[80.0625px]">INCH</td>
              <td className="w-[524px]">18 1/4</td>
              <td className="w-[524px]">45</td>
              <td className="w-[524px]">25 3/4</td>
              <td className="w-[524px]">26 3/4</td>
              <td className="w-[524px]">26</td>
              <td className="w-[524px]">40 1/2</td>
            </tr>
            <tr className="h-11">
              <td className="w-[967.938px]">L</td>
              <td className="w-[80.0625px]">INCH</td>
              <td className="w-[524px]">18 7/8</td>
              <td className="w-[524px]">47</td>
              <td className="w-[524px]">26</td>
              <td className="w-[524px]">27 1/8</td>
              <td className="w-[524px]">26 3/8</td>
              <td className="w-[524px]">42 1/2</td>
            </tr>
            <tr className="h-11">
              <td className="w-[967.938px]">XL</td>
              <td className="w-[80.0625px]">INCH</td>
              <td className="w-[524px]">19 1/2</td>
              <td className="w-[524px]">49</td>
              <td className="w-[524px]">26 1/4</td>
              <td className="w-[524px]">27 1/2</td>
              <td className="w-[524px]">26 3/4</td>
              <td className="w-[524px]">44 1/2</td>
            </tr>
            <tr className="h-11">
              <td className="w-[967.938px]">XXL</td>
              <td className="w-[80.0625px]">INCH</td>
              <td className="w-[524px]">20 1/8</td>
              <td className="w-[524px]">51</td>
              <td className="w-[524px]">26 1/2</td>
              <td className="w-[524px]">27 7/8</td>
              <td className="w-[524px]">27 1/8</td>
              <td className="w-[524px]">46 1/2</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-10">
        <strong>Women's Size Chart</strong>
      </div>
      <div className="mx-auto mt-7">
        <table
          className="mx-auto border border-solid border-black"
          style={{ margin: "20px auto", display: "block" }}
        >
          <tbody>
            <tr className="h-11 border-b">
              <td className="w-[967.938px]">
                <strong>Jacket Size</strong>
              </td>
              <td className="w-[524px]">
                <strong>XS</strong>
              </td>
              <td className="w-[524px]">
                <strong>S</strong>
              </td>
              <td className="w-[524px]">
                <strong>M</strong>
              </td>
              <td className="w-[524px]">
                <strong>L</strong>
              </td>
              <td className="w-[524px]">
                <strong>XL</strong>
              </td>
              <td className="w-[524px]">
                <strong>XXL</strong>
              </td>
            </tr>
            <tr className="h-11">
              <td className="w-[967.938px]">Bust</td>
              <td className="w-[80.0625px]">35</td>
              <td className="w-[524px]">37</td>
              <td className="w-[524px]">39.5</td>
              <td className="w-[524px]">42</td>
              <td className="w-[524px]">44.5</td>
              <td className="w-[524px]">47</td>
            </tr>
            <tr className="h-11">
              <td className="w-[967.938px]">Waist</td>
              <td className="w-[80.0625px]">26</td>
              <td className="w-[524px]">28</td>
              <td className="w-[524px]">30.5</td>
              <td className="w-[524px]">33</td>
              <td className="w-[524px]">35.5</td>
              <td className="w-[524px]">38</td>
            </tr>
            <tr className="h-11">
              <td className="w-[967.938px]">Hips</td>
              <td className="w-[80.0625px]">37</td>
              <td className="w-[524px]">39</td>
              <td className="w-[524px]">41.5</td>
              <td className="w-[524px]">44</td>
              <td className="w-[524px]">46.5</td>
              <td className="w-[524px]">49</td>
            </tr>
            <tr className="h-[55.941px]">
              <td className="w-[967.938px]">Shoulder</td>
              <td className="w-[80.0625px]">15</td>
              <td className="w-[524px]">15.5</td>
              <td className="w-[524px]">16</td>
              <td className="w-[524px]">16 7/8</td>
              <td className="w-[524px]">17.5</td>
              <td className="w-[524px]">18.5</td>
            </tr>
            <tr className="h-11">
              <td className="w-[967.938px]">Sleeve</td>
              <td className="w-[80.0625px]">23.5</td>
              <td className="w-[524px]">23 3/4</td>
              <td className="w-[524px]">24</td>
              <td className="w-[524px]">24.5</td>
              <td className="w-[524px]">25</td>
              <td className="w-[524px]">26</td>
            </tr>
            <tr className="h-11">
              <td className="w-[967.938px]">Sleeve Length (center of back)</td>
              <td className="w-[80.0625px]">30-31</td>
              <td className="w-[524px]">31-32</td>
              <td className="w-[524px]">32-33</td>
              <td className="w-[524px]">33-34</td>
              <td className="w-[524px]">34</td>
              <td className="w-[524px]">34.5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SizeChart;
