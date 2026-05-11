import React from 'react'
import { useNavigate } from 'react-router-dom';


const Packages = () => {
 
    const navigate = useNavigate();
  return (
<div className="page-container">

  {/* HEADER */}
  <section className="header">
    <div>
      <h2 className="title text-on-surface">Tours Management</h2>
      <p className="subtitle text-on-surface-variant">
        Showing 124 curated experiences across 18 destinations
      </p>
    </div>

    <button onClick={() => navigate("/add-tour")} className="btn-primary-packages">
      <span className="material-symbols-outlined">add</span>
      <span>Add New Tour</span>
    </button>
  </section>

  {/* FILTER */}
  <section className="filter">
    <div className="filter-item">
      <label className="label text-on-surface-variant">Search Tours</label>
      <input className="input" placeholder="Tour name or ID..." />
    </div>

    <div className="filter-item-sm">
      <label className="label text-on-surface-variant">Category</label>
      <select className="select">
        <option>All Categories</option>
        <option>Pilgrimage</option>
        <option>Adventure</option>
        <option>Cultural</option>
      </select>
    </div>

    <div className="filter-item-xs">
      <label className="label text-on-surface-variant">Status</label>
      <select className="select">
        <option>Active</option>
        <option>Draft</option>
        <option>Inactive</option>
      </select>
    </div>


  </section>

  {/* TABLE */}
  <section className="table-wrapper bg-surface-container-lowest">
    <table className="table">

      <thead>
        <tr className="thead-row">
          <th className="th">Tour Detail</th>
          
          <th className="th">Category</th>
          <th className="th">Pricing</th>
          <th className="th">Status</th>
       
          <th className="th th-right">Actions</th>
        </tr>
      </thead>

      <tbody className="tbody">

        {/* ROW 1 */}
        <tr className="tr group">
          <td className="td">
            <div className="tour-info">
              <img className="tour-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLhaZT-PpqfvqJlvccoHynHfdH1noI1ktIEEa-SqKggS3QbjhXZ_dNryl5m-g0kuR0XNN4UdMtxUKATOCIknDHkIECkZEaVrq7Q1Pn3_7XCu1tkhmFK8P_UOwbJwudNKSS7nHRT2UiTw8pAYUNGeo_6uMrAOz7hoJuASV_NBFrTQ_Sfeqrq-xLbZ7u-aAmhKH-qLzvKNAyQyUa5lTPii76uTS76ouZemPJSWwUE2lLEjlKzhGy5yFz02pEOdMHuggqekOZC7RJjgk" />
              <div>
                <p className="tour-title">Spiritual Journey to Taj</p>
                <p className="tour-sub">Agra, India • 4 Days</p>
              </div>
            </div>
          </td>
          
          <td className="td"><span className='bg-[#0062a11a] text-tertiary px-2 py-1 rounded text-[10px] font-bold tracking-wider'>PILGRIMAGE</span></td>
          <td className="td">
            <span className="price">$1,250</span>
            <span className="price-old">$1,500</span>
          </td>
          <td className="td"><span className='inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-bold border border-emerald-100'>ACTIVE</span></td>

          <td className="td-right">
            <div className="actions">
              <button className="icon-btn">
                <span className="material-symbols-outlined">edit</span>
              </button>
              <button className="icon-btn">
                <span className="material-symbols-outlined">visibility</span>
              </button>
              <button className="icon-btn">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </td>
        </tr>

        {/* ROW 2 */}
        <tr className="tr group">
          <td className="td">
            <div className="tour-info">
              <img className="tour-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfExjdmEvqiBQISTVxrLmC9Vxuabpf6A71aMT2FI6gl0qi04emYTKMvDDeL44EEojg5LYc8clxusv5G6fMB4kJtX4rf5YIyB__ieN3G7jwzmoVnGE3YjGOFlBgfJvno-jFlM0Vh2PkBsi3usgqbyM6roWRPxbjuOK4CkRmEuGZ-CaK8nTVKlOu6q6XEfuKHybt1xzTzxFwOe0LFqIT2wQSPyPN4lnSA8D1Li-SlsYTocn8O1KHTCGNpUfKJD3J4IfWfdDYZTQ2CbE" />
              <div>
                <p className="tour-title">Alpine Ski Expedition</p>
                <p className="tour-sub">Zermatt • 7 Days</p>
              </div>
            </div>
          </td>
         
          <td className="td">
            <span className='bg-[#a12b001a] text-primary px-2 py-1 rounded text-[10px] font-bold tracking-wider'>ADVENTURE</span></td>
          <td className="td">
            <span className="price">$3,400</span>
          </td>
          <td className="td"><span className='inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-bold border border-emerald-100'>DRAFT</span></td>

          <td className="td-right">
            <div className="actions">
              <button className="icon-btn">
                <span className="material-symbols-outlined">edit</span>
              </button>
              <button className="icon-btn">
                <span className="material-symbols-outlined">visibility</span>
              </button>
              <button className="icon-btn">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </td>
        </tr>

        {/* ROW 3 */}
        <tr className="tr group">
          <td className="td">
            <div className="tour-info">
              <img className="tour-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeLSVVL3AbQ-hUCvvN223LvlimhUmYnn8xAPr0KC37OXpjIm6jG6xv8r42UcC3AJYMrzxo1rzwlLUGfOqMitRsgJXkoTv5Y_OUgAWjmKj9M5Pg6HxGmdEhfB9htoP8AR0bLWN6cndbPT8ly_so-0l3pJ-kcaaJQxe5fOkjTi5eXYzX8BA_gXNZFxiXsjyny3koqASNnupvm8n5-cILzsIrH8pvx8dP_gVFqTzgGUIHVNn0TdgWaulH5iL4nSIs97G2xeZLSbSJyYo" />
              <div>
                <p className="tour-title">Serengeti Great Migration</p>
                <p className="tour-sub">Tanzania • 10 Days</p>
              </div>
            </div>
          </td>
          
          <td className="td"><span className='bg-[#a12b001a] text-primary px-2 py-1 rounded text-[10px] font-bold tracking-wider'>ADVENTURE</span></td>
          <td className="td">
            <span className="price">$5,200</span>
          </td>
          <td className="td"><span className='inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-bold border border-emerald-100'>INACTIVE</span></td>

          <td className="td-right">
            <div className="actions">
              <button className="icon-btn">
                <span className="material-symbols-outlined">edit</span>
              </button>
              <button className="icon-btn">
                <span className="material-symbols-outlined">visibility</span>
              </button>
              <button className="icon-btn">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </td>
        </tr>

        {/* ROW 4 */}
        <tr className="tr group">
          <td className="td">
            <div className="tour-info">
              <img className="tour-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgxYhT-nuu8GCxTL9Z3y7GedWwWH01I94BgIVQXHYwdYsr4TW6m50dMnkJV1B31j8DCXJevU68ai5fsPvrYCZsyv_HTmSlXV1RwwsL6jgwM2gG2OyZ9lfyMtYeiwxIBk4lKOHAoJKSIUS8OzLFc4XipTqDP11MNYaYrMLMURC43zxTRwGjvw2O2aAAu-Fjw7A4W1TMkZoxg-dU5s-efJcOA5_lk0C8BMaRjL-M_n8mQQOAmDV3i834LLP0fF3FC9nGGenpHwJ1xzY" />
              <div>
                <p className="tour-title">Yosemite Wilderness Trek</p>
                <p className="tour-sub">USA • 5 Days</p>
              </div>
            </div>
          </td>
          
          <td className="td"><span className='bg-[#a12b001a] text-primary px-2 py-1 rounded text-[10px] font-bold tracking-wider'>ADVENTURE</span></td>
          <td className="td">
            <span className="price">$890</span>
          </td>
          <td className="td"><span className='inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-bold border border-emerald-100'>ACTIVE</span></td>

          <td className="td-right">
            <div className="actions">
              <button className="icon-btn">
                <span className="material-symbols-outlined">edit</span>
              </button>
              <button className="icon-btn">
                <span className="material-symbols-outlined">visibility</span>
              </button>
              <button className="icon-btn">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </td>
        </tr>

      </tbody>
    </table>

    {/* PAGINATION */}

    <div
                    className="pagination">
                    <p className="text-xs text-on-surface-variant">Showing <span class="font-bold text-on-surface">1 -
                            10</span> of <span className="font-bold text-on-surface">124</span> tours</p>
                    <div class="flex items-center gap-2">
                        <button
                            className="page-btn"
                            disabled="">
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <div className="flex items-center gap-1">
                            <button className="page-number active">1</button>
                            <button
                                className="page-number">2</button>
                            <button
                                className="page-number">3</button>
                            <span className="px-2 text-on-surface-variant">...</span>
                            <button
                                className="page-number">13</button>
                        </div>
                        <button
                            className="p-1 rounded-lg hover:bg-surface-container-high text-on-surface-variant transition-colors">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>


  </section>

</div>
  )
}

export default Packages