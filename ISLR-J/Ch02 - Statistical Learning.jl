### A Pluto.jl notebook ###
# v0.14.1

using Markdown
using InteractiveUtils

# ╔═╡ 2e4eb43a-9325-414a-ac27-afe8f3757aa6
begin
	using StatsKit
	using Plots
	using StatsPlots
end

# ╔═╡ 65c0ef6f-d0bd-4778-8dfe-4166b5b50608
md"""# 2. Statistical Learning"""

# ╔═╡ 8bc7346d-bc5f-4df6-a10f-95a2ad7c5f6c
md"""## 2.1 What Is Statistical Learning ?"""

# ╔═╡ 5c82da9b-9a3d-47d1-91a8-621134a39038
md"""### FIGURE 2.1."""

# ╔═╡ fe33477a-87f3-4465-bff9-531e3bd55c4d
advertising_df = CSV.File("../data-islr/Advertising.csv") |> DataFrame;

# ╔═╡ 6df71a28-1c2c-4797-b697-203c1b176bbc
first(advertising, 5)

# ╔═╡ ca13c617-8c72-43dc-9e35-3f439470300e
begin
	sales = advertising_df.sales
	tv = advertising_df.TV
	radio = advertising_df.radio
	newspaper = advertising_df.newspaper
end

# ╔═╡ 4228af87-a2a3-45fd-8ae0-2c3316fcdb06
begin
	p1 = scatter(tv, sales, xlabel="TV", ylabel="Sales")
	p2 = scatter(radio, sales, xlabel="Radio")
	p3 = scatter(newspaper, sales, xlabel="Newspaper")
	
	plot(p1, p2, p3, layout=(1, 3), legend=false, markercolor="red")
end

# ╔═╡ b7cb5976-2b1b-4579-9a4f-5e5d2a2bae50
md"""### FIGURE 2.2."""

# ╔═╡ fb0f8735-395c-4bf2-834c-85579632dbc9
income_df = CSV.File("../data-islr/Income1.csv") |> DataFrame;

# ╔═╡ 91d0a047-9359-4453-a6bf-7845749b4975
first(income_df, 5)

# ╔═╡ 2d2e4ddb-dbfe-4d17-9530-e4182786b2e4
begin
	edu = income_df.Education
	income = income_df.Income
end

# ╔═╡ e78035ba-e405-45d1-87ab-282736aef8f9
scatter(edu, income, legend=false, xlabel="Years of Education", ylabel="Income", markercolor="red")

# ╔═╡ Cell order:
# ╠═65c0ef6f-d0bd-4778-8dfe-4166b5b50608
# ╠═2e4eb43a-9325-414a-ac27-afe8f3757aa6
# ╠═8bc7346d-bc5f-4df6-a10f-95a2ad7c5f6c
# ╠═5c82da9b-9a3d-47d1-91a8-621134a39038
# ╠═fe33477a-87f3-4465-bff9-531e3bd55c4d
# ╠═6df71a28-1c2c-4797-b697-203c1b176bbc
# ╠═ca13c617-8c72-43dc-9e35-3f439470300e
# ╠═4228af87-a2a3-45fd-8ae0-2c3316fcdb06
# ╠═b7cb5976-2b1b-4579-9a4f-5e5d2a2bae50
# ╠═fb0f8735-395c-4bf2-834c-85579632dbc9
# ╠═91d0a047-9359-4453-a6bf-7845749b4975
# ╠═2d2e4ddb-dbfe-4d17-9530-e4182786b2e4
# ╠═e78035ba-e405-45d1-87ab-282736aef8f9
