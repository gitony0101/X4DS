### A Pluto.jl notebook ###
# v0.10.0

using Markdown

# ╔═╡ d307fbf5-3a25-482f-85fd-568a75b5b956
begin
    using LinearAlgebra
    using Plots
    using DataFrames, CSV
end

# ╔═╡ cb0b5841-c2e7-42d0-bf51-2d6764ed2028
μ = [0, 0]
σ = [1.0 1.0; 1.0 2.0]
dist = Distributions.MvNormal(μ, σ)

# ╔═╡ 35bc1ce8-5a8d-44cb-be24-874031bed1a5
sample = rand(dist, 100) # the random samples are close to Figure 6.14

# ╔═╡ abd55f64-c2d1-4cd1-b143-6537624da853
p = fit(PCA, sample)

# ╔═╡ 424fdbb4-bd19-481c-a718-8bc1eed0a4c2
proj = projection(p) # get principle component
x = sample[1, :]
y = sample[2, :]

scatter(x, y)
first_pca = proj[:, 2] # principle components are sorted in descending order
second_pca = proj[:, 1]
plot!([-2,  2], [(2 * first_pca[1] / first_pca[2]), (-2 * first_pca[1] / first_pca[2])])
plot!([-2,  2], [(2 * second_pca[1] / second_pca[2]), (-2 * second_pca[1] / second_pca[2])])


# ╔═╡ 1403b7fd-4ff7-41c1-967c-c30de0656da2


# ╔═╡ Cell order:
# ╠═d307fbf5-3a25-482f-85fd-568a75b5b956
# ╠═cb0b5841-c2e7-42d0-bf51-2d6764ed2028
# ╠═35bc1ce8-5a8d-44cb-be24-874031bed1a5
# ╠═abd55f64-c2d1-4cd1-b143-6537624da853
# ╠═424fdbb4-bd19-481c-a718-8bc1eed0a4c2
# ╠═1403b7fd-4ff7-41c1-967c-c30de0656da2
