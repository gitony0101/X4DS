### A Pluto.jl notebook ###
# v0.10.0

using Markdown

# ╔═╡ 15535679-1d8e-4cbd-a8eb-26248f2a7179
begin
    using AlgebraOfGraphics
    using DataFrames, CSV
end

# ╔═╡ edaf1f58-07d1-4c1c-b991-350d3f10a66e
hitData = CSV.File("dataset/Hitters.csv") |> DataFrame;

# ╔═╡ 7e720692-4455-4150-a3ca-f9562132b0c8
# Figure 8.2
scatter(hitData.Years, hitData.Hits, xlabel="Years", ylabel="Hits")
vline!([4.5], lw=2)
plot!([4.5, 25], [117.5, 117.5], lw=2)

# ╔═╡ 61e7970a-21e7-4e28-8b00-99e31d335571
model = DecisionTreeClassifier(max_depth=2)
fit!(model, convert(Array{Float64, 2}, hitData[:, [:Years, :Hits]]), hitData.Salary)
print_tree(model)

# ╔═╡ dfae4b19-c242-40b1-b2ce-68fb50ea05a0
model = build_tree(hitData.Salary, convert(Array{Float64, 2}, hitData[:, [:Years, :Hits]]), 2,2)
# model = prune_tree(model, 0.9)
print_tree(model)

# ╔═╡ 61faa47a-904b-46c6-a656-470f0a516f3a


# ╔═╡ Cell order:
# ╠═15535679-1d8e-4cbd-a8eb-26248f2a7179
# ╠═edaf1f58-07d1-4c1c-b991-350d3f10a66e
# ╠═7e720692-4455-4150-a3ca-f9562132b0c8
# ╠═61e7970a-21e7-4e28-8b00-99e31d335571
# ╠═dfae4b19-c242-40b1-b2ce-68fb50ea05a0
# ╠═61faa47a-904b-46c6-a656-470f0a516f3a
